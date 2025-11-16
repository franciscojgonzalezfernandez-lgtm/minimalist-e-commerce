import { CustomLogo } from "./CustomLogo";

export const CustomFooter = () => {
  return (
    <footer className="border-t py-12 px-4 lg:px-8 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <CustomLogo />
            <p className="text-sm text-muted-foreground">
              Clothes inspired in the minimalist & innovation of Tesla
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  T-shirts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Sweatshirts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Jackets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Accesories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Ayuda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Deliveries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Refounds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Size guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Sustaniability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Tesla Style. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
