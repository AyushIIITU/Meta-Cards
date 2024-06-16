
import { Link } from "react-router-dom";
import style from "./Header.module.css"
function Header() {
  return (
    <header className={style.header}>
      <div className={style["logo"]}>Logo</div>
      <input type="checkbox" id={style["toggle"]} />
      <label htmlFor="toggle">
        <img
          className={style["menu"]}
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQcRCwNIHXgysCmSjnyxc4peA8hq0NI7gcQvhjIOY9WLa8wr-lshwxZcgveagSi4UoUBJ8muOPfLmpugzjVro7-5Lrpynl-Ngr_cMsKAzPU9CMwjqQLK7ee_6hf0v2FN_tPDTYAeIKYZLQpvARWwM9D-iHbyJ8OwC1Xd-u-nbDw6HiTzUScSxaVd9yEhD3/s2500/menu1.png"
          alt="menu"
        />
      </label>
      <nav className={style["navigation"]}>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/tienda">Tienda</Link>
            <ul>
              <li>
                <Link to="/computadoras-escritorio">
                  Computadoras de Escritorio
                </Link>
              </li>
              <li>
                <Link to="/laptops">Laptops</Link>
              </li>
              <li>
                <Link to="/accesorios">Accesorios</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/oferta">Oferta</Link>
            <ul>
              <li>
                <Link to="/promociones-especiales">Promociones Especiales</Link>
              </li>
              <li>
                <Link to="/descuentos-por-temporada">
                  Descuentos por Temporada
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/personalizacion">Personalización</Link>
            <ul>
              <li>
                <Link to="/configuracion-de-computadoras">
                  Configuración de Computadoras
                </Link>
              </li>
              <li>
                <Link to="/configuracion-de-laptops">
                  Configuración de Laptops
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/soporte-y-servicios">Soporte y Servicios</Link>
            <ul>
              <li>
                <Link to="/servicio-al-cliente">Servicio al Cliente</Link>
              </li>
              <li>
                <Link to="/garantias">Garantías</Link>
              </li>
              <li>
                <Link to="/soporte-tecnico">Soporte Técnico</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/nosotros">Nosotros</Link>
            <ul>
              <li>
                <Link to="/quienes-somos">Quiénes Somos</Link>
              </li>
              <li>
                <Link to="/equipo">Equipo</Link>
              </li>
              <li>
                <Link to="/mision-y-vision">Misión y Visión</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
