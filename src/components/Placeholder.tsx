type Props = {
  num: string;
  description: string;
  variant?: "dark" | "light";
  shape?: "default" | "tall" | "wide";
};

export function Placeholder({ num, description, variant = "dark", shape = "default" }: Props) {
  const classes = ["placeholder"];
  if (variant === "light") classes.push("light");
  if (shape !== "default") classes.push(shape);
  return (
    <div className={classes.join(" ")}>
      <div className="label">
        <span className="num">{num}</span>
        <span className="desc">{description}</span>
      </div>
    </div>
  );
}
