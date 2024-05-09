// src/components/CreateProductForm.jsx

import React, { useState } from 'react';

function CreateProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'décoration', // Définir une valeur par défaut
    inStock: true
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('inStock', product.inStock);

    try {
        const response = await fetch("http://localhost:3000/api/products/add", {
          method: 'POST',
          headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            // Note: Content-Type is not set because it is set automatically by the browser when you use FormData
          }),
          body: formData
        });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      const result = await response.json();
      alert('Product created successfully!');
      console.log(result);
    } catch (error) {
      console.error('Error creating product:', error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={product.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Category:
        <select name="category" value={product.category} onChange={handleChange}>
          <option value="décoration">Décoration</option>
          <option value="vêtement">Vêtement</option>
          <option value="musique">Musique</option>
        </select>
      </label>
      <br />
      <label>
        In Stock:
        <input type="checkbox" name="inStock" checked={product.inStock} onChange={() => setProduct(prev => ({ ...prev, inStock: !prev.inStock }))} />
      </label>
      <br />
      <label>
        Image:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProductForm;
