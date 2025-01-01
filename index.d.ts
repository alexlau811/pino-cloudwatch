import { Transform, Writable, WritableOptions } from "stream";
import { CloudWatchLogsClient } from "@aws-sdk/client-cloudwatch-logs";
import build from "pino-abstract-transport";

interface CloudWatchOptions extends WritableOptions {
  ignoreEmpty?: boolean;
  prefix?: string;
  stream?: string;
  interval?: number;
  stdout?: boolean;
  aws_access_key_id?: string;
  aws_secret_access_key?: string;
  aws_region?: string;
  aws_profile?: string;
  group: string;
}

interface StdoutOptions {
  stdout?: boolean;
  console?: Console;
  objectMode?: boolean;
}

interface ThrottleOptions {
  objectMode?: boolean;
}

interface Options extends CloudWatchOptions, StdoutOptions, ThrottleOptions {
}

declare class CloudWatchStream extends Writable {
  constructor(options: CloudWatchOptions);
  logStreamNamePrefix: string;
  logGroupName: string;
  logStreamName: string;
  nextSequenceToken: string | null;
  cloudWatchLogs: CloudWatchLogsClient;
  createLogGroup(options: any, callback: (err: Error | null, options?: any) => void): void;
  createLogStream(options: any, callback: (err: Error | null, options?: any) => void): void;
  nextToken(options: any, callback: (err: Error | null, options?: any) => void): void;
  putLogEvents(options: any, callback: (err: Error | null, options?: any) => void): void;
  _write(chunks: any[], encoding: string, callback: (error?: Error | null) => void): void;
}

declare class StdoutStream extends Transform {
  constructor(options?: StdoutOptions);
  console: Console;
  stdout: boolean;
  flush(callback?: () => void): void;
  _transform(chunk: any, encoding: string, callback: (error?: Error | null, data?: any) => void): void;
  _flush(callback: (error?: Error | null) => void): void;
}

declare class ThrottleStream extends Transform {
  constructor(options?: ThrottleOptions);
  lastTime: number;
  interval: number;
  timeoutId: NodeJS.Timeout | null;
  buffer: any[];
  flush(callback?: () => void): void;
  _transform(chunk: any, encoding: string, callback: (error?: Error | null, data?: any) => void): void;
  _flush(callback: (error?: Error | null) => void): void;
}

declare function factory(options: Options, errorHandler?: (err: Error) => void): CloudWatchStream;

declare function transport(options: Options): Promise<Transform & build.OnUnknown>;

export = transport;
export { factory };
