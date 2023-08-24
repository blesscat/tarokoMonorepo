'use client'

export function Button(): JSX.Element {
  return (
    <button onClick={(): void => alert("booped")} type="button">
      Boop
    </button>
  );
}
