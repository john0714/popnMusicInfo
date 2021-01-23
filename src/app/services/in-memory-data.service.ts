import { InMemoryDbService } from 'angular-in-memory-web-api';
// in-memory 웹 API는 개발 초기와 이 튜토리얼같이 시연을 할때 유용함(실제 웹 API를 쓰지 않고 원격 통신을 시뮬레이트)
// 즉, 이 파일이 시연테스트용 API임

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0,  name: 'Zero' },
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }
}
