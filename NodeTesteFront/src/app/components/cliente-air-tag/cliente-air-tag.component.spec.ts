import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAirTagComponent } from './cliente-air-tag.component';

describe('ClienteAirTagComponent', () => {
  let component: ClienteAirTagComponent;
  let fixture: ComponentFixture<ClienteAirTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteAirTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteAirTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
