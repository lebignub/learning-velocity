/**
 * Scoring engine for Learning Velocity.
 *
 * Speed score: sigmoid curve centered on 250 WPM (average adult reading speed).
 * 250 WPM → 50/100. The curve flattens at extremes so slow readers aren't
 * crushed and speed-readers aren't over-rewarded. This fixes the #1 complaint
 * from user testing: careful readers were punished by the old linear scale.
 *
 * Velocity score: weighted composite of speed, comprehension, and retention.
 * Retention is optional (only available after the next-day recall quiz).
 */

// Center of the sigmoid — average adult reading speed
const CENTER_WPM = 250;
// Steepness of the sigmoid curve. Higher = steeper transition around center.
// 0.012 gives a smooth curve: 100 WPM ≈ 13, 200 WPM ≈ 35, 250 WPM ≈ 50,
// 350 WPM ≈ 73, 500 WPM ≈ 95.
const STEEPNESS = 0.012;

/**
 * Calculate speed score (0-100) using a sigmoid curve centered on 250 WPM.
 *
 * Why sigmoid instead of linear:
 * - 250 WPM (average) maps to 50, not 31 (old formula)
 * - Slow readers get partial credit instead of being crushed
 * - Speed-readers get diminishing returns past ~400 WPM
 * - Prevents the "skim fast + guess" exploit where 25s reading + 3/4 correct
 *   beat 3min reading + 4/4 correct
 */
export function calculateSpeedScore(
  wordCount: number,
  readingTimeMs: number
): number {
  const minutes = readingTimeMs / 60_000;
  if (minutes <= 0) return 0;
  const wpm = wordCount / minutes;

  // Sigmoid: 1 / (1 + e^(-k*(x - center)))  mapped to 0-100
  const sigmoid = 1 / (1 + Math.exp(-STEEPNESS * (wpm - CENTER_WPM)));
  return Math.round(sigmoid * 100);
}

/**
 * Calculate comprehension score (0-100) from quiz answers.
 */
export function calculateComprehensionScore(
  userAnswers: number[],
  correctAnswers: number[]
): number {
  if (correctAnswers.length === 0) return 0;
  let correct = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) correct++;
  }
  return Math.round((correct / correctAnswers.length) * 100);
}

/**
 * Calculate composite Learning Velocity score.
 *
 * Weights:
 * - Speed: 25% (reading faster is good, but not the main thing)
 * - Comprehension: 50% (understanding is king)
 * - Retention: 25% (if available; otherwise reweight to speed 35%, comprehension 65%)
 *
 * Penalty: if comprehension < 40%, speed score is halved. Fast reading without
 * understanding is just skimming.
 */
export function calculateVelocityScore(
  speedScore: number,
  comprehensionScore: number,
  retentionScore: number | null
): number {
  // Penalize speed if comprehension is too low
  const effectiveSpeed =
    comprehensionScore < 40 ? speedScore * 0.5 : speedScore;

  if (retentionScore !== null) {
    // Full formula with retention
    const velocity =
      effectiveSpeed * 0.25 +
      comprehensionScore * 0.5 +
      retentionScore * 0.25;
    return Math.round(velocity);
  }

  // Without retention data, reweight
  const velocity = effectiveSpeed * 0.35 + comprehensionScore * 0.65;
  return Math.round(velocity);
}

/**
 * Calculate the user's WPM for display.
 */
export function calculateWPM(wordCount: number, readingTimeMs: number): number {
  const minutes = readingTimeMs / 60_000;
  if (minutes <= 0) return 0;
  return Math.round(wordCount / minutes);
}
