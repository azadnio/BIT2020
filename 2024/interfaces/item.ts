import { EEntityStatus } from '../enums/entity-status';
import IBase from './base';

export default interface IItem extends IBase {
  Description: string;
  Info: string;
  Category: string;
  Price: number;
  Brand: string;
  Unit: string;
  Status: EEntityStatus;
}
