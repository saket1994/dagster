# Airline demo
This repository models realistic data download, ingest, and manipulation pipelines in Dagster,
using real-world airline data. It is intended to exercise the features of the Dagster tooling,
and as a model for users building their own first production pipelines in the system. 

### Running tests
You won't want to suppress test output if you want to see loglines from dagster:

    pytest -s

We use [pytest marks](https://docs.pytest.org/en/latest/example/markers.html#mark-examples) to
identify useful subsets of tests. For instance, to run only those tests that do not require a
running Spark cluster, you can run:

    pytest -m "not spark"

To run the full test suite, you will need:

- An Internet connection
- AWS credentials accessible in the normal credential chain
- A local Spark install
- A running Postgres at `postgresql://test:test@127.0.0.1:5432/test`. (A docker-compose file is
  provided in this repo; run `docker-compose up`.)

### Orchestrating AWS resources
The pipelines defined in this repository can run against a local Spark cluster
and Postgres instance, or they can run against a Redshift cluster and Spark
running on Amazon EMR.

We manage AWS resources with [pulumi](https://github.com/pulumi/pulumi).
First, install the pulumi CLI:

    brew install pulumi

Pulumi resources are divided by "project". To spin resources up for a demo run,
use the `demo_resources` project.

First, make sure you have the requirements. (You'll need to have already
installed TypeScript.)

    cd pulumi/demo_resources
    npm install

Then, you can bring up resources by running:

    pulumi up

This will take between 4 and 5 minutes.

To destroy resources, run:

    pulumi destroy

<small>
*Warning*: Currently we are unable to cleanly tear down the VPC using pulumi
because of dependency errors like the following:

    error: Plan apply failed: deleting urn:pulumi:demo_resources-dev::demo_resources::aws-infra:network:Network$aws:ec2/vpc:Vpc::airline_demo_vpc: DependencyViolation: The vpc 'vpc-01a7f7c286196cdc0' has dependencies and cannot be deleted.
        status code: 400, request id: 03a586f3-e17e-41e2-b5fd-c4275226df30

It's unclear whether this is an issue with pulumi/aws-infra or something else,
maybe the autogenerated EMR slave and master security groups (? -- but if so,
see https://github.com/pulumi/pulumi/issues/1691 -- or, if this is in fact an issue
with the underlying terraform provider, see https://github.com/terraform-providers/terraform-provider-aws/issues/3465,
and many other issues suggesting the EMR resource in the AWS provider is not
fully mature). There is no good way to find out *which* dependency is causing
this error (generated in the AWS CLI), and no way to force delete dependencies
from the command line (See: https://github.com/aws/aws-cli/issues/1721,
https://forums.aws.amazon.com/thread.jspa?threadID=223412).

Right now the workaround is to wait for a timeout (about 15 minutes), then
manually delete the VPC from the console, which will force-delete dependencies.
</small>

### TODOs

- Flesh out unit tests for solids
- Wire Spark up to EMR cluster
- Add config option for local ingestion (Postgres)
- Add config option for Spark running on EMR cluster
- Document running the pipeline and tests (e.g., postgres requirements)
- Add expectations
- Running local Spark tests on Circle is going to require us to create a custom Docker image with
  both Python and a Java runtime [(!)](https://discuss.circleci.com/t/recommended-way-to-use-multiple-languages-in-2-0/14174/11)
- Maybe implement templated SQL handling
- Replace unhelpful stringcase dependency
- Add sub-DAG tests

### Issues with general availability
- Right now the pulumi spec, as well as the sample config, expect that you will
be able to orchestrate a Redshift cluster at `db.dagster.io` and an EMR cluster
at `spark.dagster.io`. If you are running this demo and you do not control
`dagster.io`, you will need to edit both the pulumi project and the config to
point these at DNS you do control.
