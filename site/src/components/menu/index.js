import storage from 'local-storage'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss'

export default function Index({ selecionado }) {
    const [menuSelecionado, setMenuSelecionado] = useState(selecionado);
    const navigate = useNavigate();
    
    function sairClick() {
        storage.remove('usuario-logado');
        navigate('/');
    }

    function selectionarMenu(menu) {
        setMenuSelecionado(menu);
    }
    
    function verificarMenuSelecionado(menu) {
        if(menu == menuSelecionado){
            return 'selecionado'
        }else{
            return '';
        }
    }
    
    console.log(menuSelecionado);

    return (
        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <img src="/assets/images/logo.svg" alt="logo" />
                    <div>Portifolio.me</div>
                </div>

                <div className='menu-items'>
                    <Link to='/admin' onClick={() => selectionarMenu('home')} className={verificarMenuSelecionado('home') }>
                        <img src="/assets/images/icon-home.svg" alt="home" />
                        <div>Home</div>
                    </Link>
                    <Link to='/admin/cadastrar' onClick={() => selectionarMenu('cadastrar') } className={verificarMenuSelecionado('cadastrar') }>
                        <img src="/assets/images/icon-cadastrar.svg" alt="cadastrar" />
                        <div>Cadastrar</div>
                    </Link>
                    <Link to='/admin/consultar' onClick={() => selectionarMenu('consultar')} className={verificarMenuSelecionado('consultar') }>
                        <img src="/assets/images/icon-consultar.svg" alt="consultar" />
                        <div>Consultar</div>
                    </Link>
                </div>
            </div>

            <div className='menu-items'>
                <a onClick={sairClick} href="#">
                    <img src="/assets/images/icon-sair.svg" alt="consultar" />
                    <div >Sair</div>
                </a>
            </div>
        </nav>
    )
}