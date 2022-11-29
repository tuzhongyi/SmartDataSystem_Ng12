import { Pipe, PipeTransform } from '@angular/core';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';

import { Language } from '../tools/language';

@Pipe({
  name: 'language_collection_point_classification_pipe',
})
export class LanguageCollectionPointClassification implements PipeTransform {
  transform(value: CollectionPointClassification, ...args: unknown[]): string {
    return Language.CollectionPointClassification(value);
  }
}
