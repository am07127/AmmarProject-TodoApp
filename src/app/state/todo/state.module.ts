import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { todoFeature } from "./todo.feature";
import { TodoEffects } from "./todo.effects";
import { TodoStoreService } from "./todo.store";
import { TodoService } from "../../todo/todo.service";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
@NgModule({
  imports: [
    // Root store configuration
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,    // Prevents state mutations
        strictActionImmutability: true,   // Prevents action mutations
        strictActionSerializability: true, // (Optional) For complex actions
        strictStateSerializability: true   // (Optional) For complex state
      }
    }),
    
    // Feature store registration
    StoreModule.forFeature(todoFeature),
    
    // Effects registration
    EffectsModule.forRoot([TodoEffects]),
    
    // DevTools configuration (optimized for safety)
    StoreDevtoolsModule.instrument({
      maxAge: 25,                        // Retains last 25 actions
      logOnly: false,    // Auto-disables in production
      autoPause: true,                    // Pauses on context loss
      features: {
        pause: false,                     // Disable pausing
        lock: true,                       // Enable action locking
        persist: false                    // Disable state persistence
      }
    })
  ]
})
export class StateModule {}