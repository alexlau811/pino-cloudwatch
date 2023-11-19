const CloudWatchLogsClient = require("./cloudwatch-logs");
const {
  CreateLogStreamCommand,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
  CreateLogGroupCommand,
} = require("@aws-sdk/client-cloudwatch-logs");

module.exports = {
  CloudWatchLogsClient,
  CreateLogStreamCommand,
  PutLogEventsCommand,
  DescribeLogStreamsCommand,
  CreateLogGroupCommand,
};
