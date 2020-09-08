import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {

	transform(arr: any[], searchText: string, fieldName?: string): any[] {
		if (!arr) return [];
		if (!searchText || searchText.length<1) return arr;
		searchText = searchText.toLowerCase();
		return arr.filter((it: any) => {
			if (typeof it == 'string') {
				return it.toLowerCase().includes(searchText);
			} else if (typeof it == 'number') {
				return it.toString().toLowerCase().includes(searchText);
			} else {
				if(it[fieldName]){
					return it[fieldName].toLowerCase().includes(searchText);
				}
			}

		});
	}

}
