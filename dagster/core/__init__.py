from __future__ import (absolute_import, division, print_function, unicode_literals)
from builtins import *  # pylint: disable=W0622,W0401

from dagster import check
from dagster.core import types

from .definitions import InputDefinition
from .graph import DagsterPipeline


def pipeline(**kwargs):
    return DagsterPipeline(**kwargs)


def input_definition(**kwargs):
    return InputDefinition(**kwargs)


def file_input_definition(argument_def_dict=None, **kwargs):
    check.param_invariant(argument_def_dict is None, 'Should not provide argument_def_dict')
    return InputDefinition(argument_def_dict={'path': types.PATH}, **kwargs)