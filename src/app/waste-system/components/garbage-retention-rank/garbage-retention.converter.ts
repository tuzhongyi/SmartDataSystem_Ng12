import { Injectable } from '@angular/core';
import { IConverter } from '../iconverter.interface';

export class GarbageRetentionConverter implements IConverter {
  toRank() {
    return 10;
  }
}
