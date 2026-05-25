import { Controller, Sse } from '@nestjs/common';
import { interval, map, Observable, take } from 'rxjs';

@Controller('ai')
export class AiController {
  @Sse('stream')
  streamText(): Observable<{ data: string }> {
    const works = [
      'In the beginning, there was only darkness.',
      'Then, a spark of light emerged, illuminating the void.',
      'From that light, life began to flourish and evolve.',
      'Civilizations rose and fell, each leaving their mark on history.',
      'Now, we stand at the dawn of a new era, where technology and humanity intertwine.',
    ];
    return interval(2000).pipe(
      take(works.length),
      map((index) => ({ data: works[index] })),
    );
  }
}
