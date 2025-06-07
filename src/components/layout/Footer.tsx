export function Footer() {
  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Voyage Auto. All rights reserved.</p>
        <p className="text-sm mt-1">Your trusted partner for car rentals.</p>
      </div>
    </footer>
  );
}
