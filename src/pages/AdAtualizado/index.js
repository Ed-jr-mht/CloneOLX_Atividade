import 
    React, 
    { 
        useState, 
        useEffect 
    } from 'react';
import MaskedInput from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons';
import { PageArea } from './styled';
import { 
    PageContainer, 
    PageTitle, 
    ErrorMessage 
} from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import { useParams } from 'react-router-dom';

const Page = () => {
    const api = useApi();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [fileField, setFileField] = useState();
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];
        if(!title.trim()) {
            errors.push("Esse Titulo é Obrigatório !");
        }
        if(!category.trim()) {
            errors.push("Escolha uma categoria antes de finalizar");
        }
        if(errors.length === 0) {
            const fData = new FormData();
            fData.append("title", title);
            fData.append("price", price);
            fData.append('priceneg', priceNegotiable);
            fData.append("desc", description);
            fData.append("cat", category);
            if(fileField.current.files.length > 0) {
                for(let i = 0; i < fileField.current.files.length; i++) {
                    fData.append("img", fileField.current.files[i]);
                }
            }
            const response = await api.updateAd(id, fData);
            if(!response.error) {
                window.location.href = '/';
            } else {
                setError(response.error);
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        descimalSymbol: ','
    });

    return (
        <PageContainer>
            <PageTitle TextAlign={'center'} Margin={10 + 'px ' + 0}>
                Alterar Anuncio
            </PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            Título
                        </div>
                        <div className="area--input">
                            <input 
                                type="text" 
                                disabled={disabled} 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Categoria
                        </div>
                        <div className="area--input">
                            <select 
                                disabled={disabled} 
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option value=""></option>
                                {categories && categories.map( category =>
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço
                        </div>
                        <div className="area--input">
                            <MaskedInput
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Preço Negociável
                        </div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                disabled={disabled} 
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Descrição
                        </div>
                        <div className="area--input">
                            <textarea
                                disabled={disabled}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Imagens (1 ou mais de uma)
                        </div>
                        <div className="area--input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Mudar Anuncio ...</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    )
}

export default Page;