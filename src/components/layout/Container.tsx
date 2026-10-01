// Container is now a no-op wrapper — each section manages its own max-width
type Props = { children: React.ReactNode };
export default function Container({ children }: Props) {
  return <>{children}</>;
}
