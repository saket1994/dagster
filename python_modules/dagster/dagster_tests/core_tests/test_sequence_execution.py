import pytest
import six

from dagster import (
    DagsterInvariantViolationError,
    DependencyDefinition,
    InputDefinition,
    Int,
    OutputDefinition,
    PipelineDefinition,
    check,
    dagster_type,
    execute_pipeline,
    solid,
)

from dagster.core.definitions.dependency import SequenceDependencyDefinition


@dagster_type
class Sequence:
    def __init__(self, iterable):
        self._iterable = iterable

    def items(self):
        for item in self._iterable():
            yield item


def test_sequence_pipeline():
    events = []

    def _produce_things():
        events.append('enqueue-1')
        yield 1
        events.append('enqueue-2')
        yield 2

    @solid(outputs=[OutputDefinition(Sequence)])
    def produce_sequence(_info):
        return Sequence(_produce_things)

    @solid(inputs=[InputDefinition('seq', Sequence)])
    def consume_sequence(_info, seq):
        assert isinstance(seq, Sequence)
        for val in seq.items():
            events.append('dequeue-{}'.format(val))

    pipeline_def = PipelineDefinition(
        name='sequence_pipeline',
        solids=[produce_sequence, consume_sequence],
        dependencies={'consume_sequence': {'seq': DependencyDefinition('produce_sequence')}},
    )

    result = execute_pipeline(pipeline_def)
    assert result.success

    assert events == ['enqueue-1', 'dequeue-1', 'enqueue-2', 'dequeue-2']


@pytest.mark.skip('for now')
def test_basic_fan_out():
    def _produce_things():
        yield 1
        yield 2

    @solid(outputs=[OutputDefinition(Sequence)])
    def produce_sequence(_info):
        return Sequence(_produce_things)

    @solid(inputs=[InputDefinition('num', Int)])
    def consume_int(_info, num):
        print(num)

    pipeline_def = PipelineDefinition(
        name='sequence_pipeline',
        solids=[produce_sequence, consume_int],
        dependencies={'consume_int': {'num': SequenceDependencyDefinition('produce_sequence')}},
    )

    result = execute_pipeline(pipeline_def)
    assert result.success
