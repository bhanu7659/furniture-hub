import './products.css';
import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
const Products = () => {
    const params = useParams();
    const [imageUrls, setImageUrls] = useState([]);
    const getImages = (r) => {
        let images = [];
        r.keys().map((item, index) => {
            images.push(item.replace('./', ''));
        });
        return images;
    }
    let filtered = [];
    switch (params.product) {
        case 'sofas':
            filtered = getImages(require.context(`./products/sofas`, false, /\.(png|jpe?g|svg)$/));
            break;
        case 'doors':
            filtered = getImages(require.context(`./products/doors`, false, /\.(png|jpe?g|svg)$/));
            break;
        case 'chairs':
            filtered = getImages(require.context(`./products/chairs`, false, /\.(png|jpe?g|svg)$/));
            break;
        case 'cots':
            filtered = getImages(require.context(`./products/cots`, false, /\.(png|jpe?g|svg)$/));
            break;
        case 'stands':
            filtered = getImages(require.context(`./products/stands`, false, /\.(png|jpe?g|svg)$/));
            break;
        case 'diningtables':
            filtered = getImages(require.context(`./products/diningtables`, false, /\.(png|jpe?g|svg)$/));
            break;
        default:
            console.error(`Product ${params.product} not found`);
    }
    
    useEffect(() => {
        document.body.scrollIntoView();
        const fetchImages = async () => {
        try {
            const urls = [];
            for (const imageName of filtered) {
                const imageUrl = await import(`./products/${params.product}/${imageName}`);
                urls.push(imageUrl.default);
            }
            setImageUrls(urls);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
        };
        fetchImages();
    }, []);
    const handleClickOnImage=()=>{
        
    }
    return (
        <div className='selectedProductsPageContainer'>
            <h2>{params.product.toUpperCase()} Image Gallery</h2>
            <p>Get long lasting, affordable and customized {params.product} designed by our experts</p>
            <div className="productsContainer">
                {imageUrls.map((url, index) => (
                    <div className='product'>
                        <img key={index} src={url} alt={`Sofa ${index + 1}`} onClick={handleClickOnImage}/>
                        <p className='bubble'>{index+1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

