import { errorExtractor } from 'error-extractor';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Layout } from './Components/LayoutArea/Layout/Layout';
import './index.css';
import { store } from './Redux/Store';
import reportWebVitals from './reportWebVitals';
import { interceptor } from './Utils/Interceptor';


// automatically adds jwt
(async () => {
    try {
        interceptor.registerInterceptor();
    }
    catch (err: any) {
        const message = errorExtractor.getMessage(err);
                Swal.fire({
                    title: 'Something went wrong',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
    }
})();


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
