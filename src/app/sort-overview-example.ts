import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

/**
 * @title Sorting overview
 */
@Component({
  selector: 'sort-overview-example',
  templateUrl: 'sort-overview-example.html',
  styleUrls: ['sort-overview-example.css'],
})
export class SortOverviewExample {
  desserts: Route[] = [
    {
      uuid: 'uweq1',
      address: '0.0.0.0',
      mask: '0',
      gateway: '0.0.0.0',
      interface: 'Ethernet',
    },
    {
      uuid: 'uweq2',
      address: '10.1.30.0',
      mask: '24',
      gateway: '0.0.0.0',
      interface: 'Fiber',
    },
    {
      uuid: 'uweq3',
      address: '192.168.1.0',
      mask: '0',
      gateway: '0.0.0.0',
      interface: 'Ethernet',
    },
    {
      uuid: 'uweq4',
      address: '193.0.174.0',
      mask: '24',
      gateway: '0.0.0.0',
      interface: 'MEtro',
    },
    {
      uuid: 'uweq5',
      address: '195.0.174.0',
      mask: '24',
      gateway: '0.0.0.0',
      interface: 'Ethernet',
    },
    {
      uuid: 'uweq6',
      address: '163.0.174.0',
      mask: '24',
      gateway: '0.0.0.0',
      interface: 'Ethernet',
    },
    {
      uuid: 'uweq7',
      address: '0.0.0.0',
      mask: '0',
      gateway: '0.0.0.0',
      interface: 'Ethernet',
    },
  ];

  sortedData: Route[];

  constructor() {
    this.sortedData = this.desserts.slice();
  }

  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'gateway':
        case 'address':
          return compareIp(a.address, b.address, isAsc);
        case 'interface':
          return compare(a.interface, b.interface, isAsc);
        default:
          return 0;
      }
    });
  }
}

function getIpVal(a: string): number {
  return Number(
    a
      .split('.')
      .map(
        (num: string, idx: number) => parseInt(num) * Math.pow(2, (3 - idx) * 8)
      )
      .reduce((a, v) => ((a += v), a), 0)
  );
}

function compareIp(a: string, b: string, isAsc: boolean) {
  return (getIpVal(a) - getIpVal(b)) * (isAsc ? 1 : -1);
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
