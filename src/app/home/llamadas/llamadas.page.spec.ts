import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LlamadasPage } from './llamadas.page';

describe('LlamadasPage', () => {
  let component: LlamadasPage;
  let fixture: ComponentFixture<LlamadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LlamadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
