import { ParserInterface } from './parser.interface';
import { AbstractTemplateParser } from './abstract-template.parser';
import { TranslationCollection } from '../utils/translation.collection';

export class PipeParser extends AbstractTemplateParser implements ParserInterface {

	public extract(contents: string, path?: string): TranslationCollection {
		if (path && this._isAngularComponent(path)) {
			contents = this._extractInlineTemplate(contents);
		}

		return this._parseTemplate(contents);
	}

	protected _parseTemplate(template: string): TranslationCollection {
		let collection: TranslationCollection = new TranslationCollection();

		const regExp: RegExp = /(['"`])((?:(?!\1).|\\\1)+)\1\s*\|\s*translate: (['"`])((?:(?!\3).|\\\3)+)/g;
		let matches: RegExpExecArray;
		while (matches = regExp.exec(template)) {
			collection = collection.add(matches[2].split('\\\'').join('\''), (matches[4]);
		}

		return collection;
	}

}
