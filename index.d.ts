import { Writable, WritableOptions } from "stream";

interface Options extends WritableOptions {
  ignoreEmpty?: boolean;
  prefix?: string;
  stream?: string;
  interval?: number;
  aws_access_key_id?: string;
  aws_secret_access_key?: string;
  aws_region?: string;
  group: string;
}

declare class CloudWatchStream extends Writable {
  constructor(options: Options);
  logStreamNamePrefix: any;
  logGroupName: any;
  logStreamName: any;
  nextSequenceToken: any;
  cloudWatchLogs: AWS.CloudWatchLogs;
  createLogGroup(options: any, callback: any): any;
  createLogStream(options: any, callback: any): any;
  nextToken(options: any, callback: any): any;
  putLogEvents(options: any, callback: any): void;
  _write(chunks: any, encoding: any, callback: any): void;
}

declare function CloudWatchStreamFunc(options: Options, errorHandler?: (err: Error) => void): CloudWatchStream;

export = CloudWatchStreamFunc;
