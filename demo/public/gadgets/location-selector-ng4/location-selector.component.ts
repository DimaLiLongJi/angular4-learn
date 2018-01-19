import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OpportunityService } from '../../services/opportunity.service.ts'
import { LocationTagService } from '../../services/location-tag.service.ts';
import { WindowRef } from '../../services/window.service.ts';

import { Location } from './locationList.class.ts';

@Component({
  selector: 'location-selector',
  templateUrl: '/gadgets/location-selector-ng4/template.html',
  styleUrls: ['/gadgets/location-selector-ng4/style.less']
})

export class LocationSelectorComponent implements OnInit {

  constructor(
    private opportunityService: OpportunityService,
    private locationTagService: LocationTagService,
    private windowRef: WindowRef,
  ) { }

  @Input()
  set location(location: any) {
    this.change.emit(location);
  };

  @Output() change = new EventEmitter();


  locationList: Location[] = [];
  moreLocation: boolean;
  selectedCountry: any;
  provinceList: any;
  allLocationTag: any;

  ngOnInit(): void {
    this.getHotLocationList();
    this.getLocationTagList();
    // console.log(this.location);
  }

  selectLocation(location: any) {
    this.location = location;
  }

  selectProvince(province: any) {
    if (this.locationList.some(l => l.id === province.id)) {
      this.location = province;
    } else {
      this.location = province;
      this.locationList[this.locationList.length - 1] = province;
    }
  }

  selectCountry(c: any, event: any) {
    event.stopPropagation();
    // this.provinceList = [c];
    this.selectedCountry = c;
    this.provinceList = {
      cityByGroup: c.cityByGroup,
      cityGroup: c.cityGroup,
    };
  }

  toggleMoreLocation() {
    this.moreLocation = !this.moreLocation;
  }

  getHotLocationList() {
    this.opportunityService.getLocationList({ limit: 12 }).then((result) => {
      this.locationList = this.locationList.concat(result);
    });
  }

  getLocationTagList() {
    Promise.all([this.locationTagService.getLocationTagList(), this.opportunityService.getLocationList()]).then((result) => {
      const allLocationTag: any = result[0];
      const countOopLocation: any = result[1];
      let temp = null;
      const list = countOopLocation.map((location) => {
        temp = allLocationTag.filter(allLocation => allLocation.id === location.id)[0];
        if (temp) {
          return { id: temp.id, initial: temp.initial, name: temp.name, parentId: temp.parentId, count: location.count };
        }
      });
      allLocationTag.forEach((l) => {
        if (l.parentId === -1) {
          list.push({ name: l.name, initial: l.initial, parentId: l.id, id: l.id, count: 10000000 });
        }
      });
      const countries = allLocationTag.filter(location => location.parentId === -1).map((country) => {
        country.cityGroup = [];
        country.cityByGroup = [];

        country.cityByGroup[0] = this.sortByCount(/[a-g, A-G]/, list, country);
        country.cityByGroup[1] = this.sortByCount(/[h-n, H-N]/, list, country);
        country.cityByGroup[2] = this.sortByCount(/[o-t, O-T]/, list, country);
        country.cityByGroup[3] = this.sortByCount(/[u-z, U-Z]/, list, country);

        if (country.cityByGroup[0].length > 0) {
          country.cityGroup.push(this.extractInitialForGroup(country.cityByGroup[0]));
        }
        if (country.cityByGroup[1].length > 0) {
          country.cityGroup.push(this.extractInitialForGroup(country.cityByGroup[1]));
        }
        if (country.cityByGroup[2].length > 0) {
          country.cityGroup.push(this.extractInitialForGroup(country.cityByGroup[2]));
        }
        if (country.cityByGroup[3].length > 0) {
          country.cityGroup.push(this.extractInitialForGroup(country.cityByGroup[3]));
        }
        country.cityByGroup = country.cityByGroup.filter(cityArr => cityArr.length > 0);

        return country;
      });
      this.allLocationTag = countries;
      this.selectedCountry = this.allLocationTag.filter(c => c.name === '中国')[0];
      this.provinceList = this.allLocationTag.filter(c => c.name === '中国');
      this.provinceList = {
        cityByGroup: this.selectedCountry.cityByGroup,
        cityGroup: this.selectedCountry.cityGroup,
      };
    });
  }

  extractInitialForGroup(array: Array<any>): any {
    return array.map(p => p.initial).sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 1;
    }).filter((currentValue, index, arr) => currentValue !== arr[index + 1]).join(' ');
  }

  sortByCount(reg: any, list: Array<any>, country: any): Array<any> {
    let countA: any,
      countB: any;
    const arr: Array<any> = list.filter(l => reg.test(l.initial) && l.parentId === country.id).sort((a, b) => {
      countA = a.count;
      countB = b.count;
      if (countA <= countB) {
        return 1;
      }
      return -1;
    });
    return arr;
  }

}
