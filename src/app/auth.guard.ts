
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AthleteService } from "./services/athlete.service";

export const canActivate = () => {
    
    const router = inject(Router);
    const athleteService: AthleteService = inject(AthleteService);

    // Call service to check authetication
    athleteService.authAthelte().subscribe({
        next: () => {return true},
        error: () => {
            // failed auth. redirect to login
            router.navigate(['/login']);
            return false;
        }
    })
}