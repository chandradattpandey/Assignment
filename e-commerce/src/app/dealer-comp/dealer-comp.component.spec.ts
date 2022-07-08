import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerCompComponent } from './dealer-comp.component';

describe('DealerCompComponent', () => {
  let component: DealerCompComponent;
  let fixture: ComponentFixture<DealerCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
