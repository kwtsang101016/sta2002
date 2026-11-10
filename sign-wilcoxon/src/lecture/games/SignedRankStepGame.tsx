import { useMemo, useState } from "react";
import styles from "../Lecture.module.css";
import { usePrintMode } from "../printContext";
import { InlineMath, MathText } from "../scenes/shared";

const MIN_N = 3;
const MAX_N = 8;

function sumTo(n: number): number {
  return (n * (n + 1)) / 2;
}

function defaultSigns(n: number): number[] {
  return Array.from({ length: n }, () => 1);
}

/** Flip signs of 1…n to see that W only lands on every other integer. */
export function SignedRankStepGame() {
  const print = usePrintMode();
  const [n, setN] = useState(5);
  const [signs, setSigns] = useState(() => defaultSigns(5));

  const safeSigns = signs.length === n ? signs : defaultSigns(n);
  const total = sumTo(n);
  const w = useMemo(
    () => safeSigns.reduce((sum, sign, index) => sum + sign * (index + 1), 0),
    [safeSigns],
  );

  const values = useMemo(() => {
    const list: number[] = [];
    for (let value = -total; value <= total; value += 1) list.push(value);
    return list;
  }, [total]);

  const setNAndReset = (next: number) => {
    setN(next);
    setSigns(defaultSigns(next));
  };

  const flip = (index: number) => {
    setSigns((current) => {
      const base = current.length === n ? current : defaultSigns(n);
      return base.map((sign, i) => (i === index ? -sign : sign));
    });
  };

  return (
    <div className={styles.stepGame}>
      <p className={styles.small} style={{ marginTop: 0 }}>
        <strong>Explorer.</strong> Choose <InlineMath tex="n" />, then click a box to flip its sign. The
        marked value is <MathText text="$W=\sum_{k=1}^n \pm k$" />. Flipping rank{" "}
        <InlineMath tex="k" /> changes <InlineMath tex="W" /> by <InlineMath tex="\pm 2k" />, so{" "}
        <InlineMath tex="W" /> only hits every other integer between{" "}
        <MathText text="$-n(n+1)/2$" /> and <MathText text="$n(n+1)/2$" />.
      </p>

      {!print ? (
        <div className={styles.tools}>
          <label className={styles.small}>
            <InlineMath tex="n" />
            <input
              type="range"
              min={MIN_N}
              max={MAX_N}
              value={n}
              onChange={(event) => setNAndReset(Number(event.target.value))}
            />
            <span>{n}</span>
          </label>
          <button className={styles.ghost} type="button" onClick={() => setSigns(defaultSigns(n))}>
            Reset to all +
          </button>
        </div>
      ) : null}

      <div className={styles.signChipRow} aria-label="Signed integers 1 through n">
        {safeSigns.map((sign, index) => {
          const rank = index + 1;
          const positive = sign > 0;
          return (
            <button
              key={rank}
              type="button"
              className={`${styles.signChip} ${positive ? styles.signChipPos : styles.signChipNeg}`}
              onClick={print ? undefined : () => flip(index)}
              disabled={print}
              aria-label={`Rank ${rank}, currently ${positive ? "plus" : "minus"}. Click to flip.`}
            >
              {positive ? `+${rank}` : `−${rank}`}
            </button>
          );
        })}
      </div>

      <p className={styles.stepGameW}>
        Current <InlineMath tex="W" /> = <strong>{w}</strong>
        {print ? null : (
          <span className={styles.muted}>
            {" "}
            · click a chip to flip · possible values are spaced by 2
          </span>
        )}
      </p>

      <div className={styles.numberLineWrap} aria-label="Possible values of W">
        <div className={styles.numberLine}>
          {values.map((value) => {
            const possible = (value - total) % 2 === 0;
            const current = value === w;
            return (
              <div
                key={value}
                className={[
                  styles.numberTick,
                  possible ? styles.numberTickPossible : styles.numberTickImpossible,
                  current ? styles.numberTickCurrent : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                title={
                  possible
                    ? current
                      ? `Current W = ${value}`
                      : `Possible value ${value}`
                    : `Impossible value ${value}`
                }
              >
                <span className={styles.numberTickMark} />
                {(value === -total || value === 0 || value === total || current) && (
                  <span className={styles.numberTickLabel}>{value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
