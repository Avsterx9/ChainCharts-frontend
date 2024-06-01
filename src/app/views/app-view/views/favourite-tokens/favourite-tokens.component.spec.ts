import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteTokensComponent } from './favourite-tokens.component';

describe('FavouriteTokensComponent', () => {
  let component: FavouriteTokensComponent;
  let fixture: ComponentFixture<FavouriteTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteTokensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
