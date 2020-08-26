import aws from 'aws-sdk';

import { AwsClient } from '@/app/api/aws/AwsClient';

/**
 * Generates an AwsClient instance
 */
export const getAwsClient = () => {
  const credentials = new aws.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE });
  const config = {
    region: process.env.AWS_REGION || 'eu-west-1',
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
  };

  const client = new AwsClient(config);

  return { client };
};
