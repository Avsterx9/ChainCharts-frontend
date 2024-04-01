import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCryptoDataComponent } from './global-crypto-data.component';

describe('GlobalCryptoDataComponent', () => {
  let component: GlobalCryptoDataComponent;
  let fixture: ComponentFixture<GlobalCryptoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalCryptoDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalCryptoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
