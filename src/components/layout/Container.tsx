// Container conservé comme wrapper transparent pour préserver l'agencement individuel des sections
type Props = { children: React.ReactNode };

export default function Container({ children }: Props) {
  return <>{children}</>;
}
