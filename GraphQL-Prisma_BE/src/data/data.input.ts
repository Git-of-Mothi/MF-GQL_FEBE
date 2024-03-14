import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DataInput {
  @Field()
  fname: string;

  @Field()
  mail: string;

  @Field()
  number: string;

  @Field()
  website: string;

  @Field()
  contactName: string;

  @Field()
  contactPhone: string;

  @Field()
  contactMail: string;

  @Field()
  notes: string;

  @Field()
  type: string;

  @Field()
  category: string;

  @Field()
  percentage: string;

  @Field()
  activeFrom: string;

  @Field()
  criticalAccount: string;

  @Field()
  paymentOptions: string;
}
