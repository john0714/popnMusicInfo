
// 複数Export可能, Object(안에 있는 id, name같은건 Property)作成
// 前はapp.component.tsにこのクラスがあって一つのファイルに二つ以上のクラスがあったけど、Augularでは一つのファイルに一つのクラスを推奨する。
// Hero 프로퍼티(클래스)는 input 프로퍼티 입니다.
export class Hero {
  id: number;
  name: string;
}
