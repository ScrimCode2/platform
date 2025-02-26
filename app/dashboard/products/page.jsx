'use client'
import { useEffect, useState } from 'react'
import Delete from './delete'
import styles from './Products.module.css'

export default function ShopPage() {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalType, setModalType] = useState(null)
  // eslint-disable-next-line no-undef
  const [openCategories, setOpenCategories] = useState(new Set());
  // eslint-disable-next-line no-undef
  const [openSubcategories, setOpenSubcategories] = useState(new Set());

  const toggleCategory = (categoryId) => {
    setOpenCategories(prev => {
      // eslint-disable-next-line no-undef
      const newSet = new Set(prev);
      newSet.has(categoryId) ? newSet.delete(categoryId) : newSet.add(categoryId);
      return newSet;
    });
  };

  const toggleSubcategory = (subcategoryId) => {
    setOpenSubcategories(prev => {
      // eslint-disable-next-line no-undef
      const newSet = new Set(prev);
      newSet.has(subcategoryId) ? newSet.delete(subcategoryId) : newSet.add(subcategoryId);
      return newSet;
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    subcategoryId: '',
    filePath: '',
    content: '',
    desrtiption: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/shop')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: modalType,
          data: formData
        })
      })

      if (!response.ok) throw new Error('Creation failed')
      
      // const result = await response.json()
      setModalType(null)
      setFormData({
        name: '',
        price: '',
        stock: '',
        categoryId: '',
        subcategoryId: '',
        filePath: '',
        content: '',
        desrtiption: ''
      })
      fetchData() // Refresh data
    } catch (err) {
      setError(err.message)
    }
  }

  const renderForm = () => {
    return (
      <div className={styles.modalContent}>
        <h2 className={styles.formTitle}>
        <button 
  className={styles.closeButton}
  onClick={() => setModalType(null)}
  aria-label="Close modal"
>
  &times;
</button>
          {`Create New ${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)}`}
        </h2>
        
        <form onSubmit={handleCreate} className={styles.formContainer}>
          <div className={styles.containerinputs}>
          {modalType === 'category' && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Category Name:
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </label>
            </div>
          )}
  
          {modalType === 'subcategory' && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Subcategory Name:
                  <input
                    type="text"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </label>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Parent Category:
                  <select
                    className={styles.formSelect}
                    value={formData.categoryId}
                    onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                    required
                  >
                    <option value="">Select category</option>
                    {categories?.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          )}
  
          {modalType === 'product' && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Product Name:
                  <input
                    type="text"
                    className={styles.formInput}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </label>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Price:<br/>
                  <input
                    type="number"
                    step="0.01"
                    className={styles.formInput}
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </label>
              </div>
  
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Stock:
                  <input
                    type="number"
                    className={styles.formInput}
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                  />
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Content:
                  <textarea
                    type="number"
                    className={styles.formInput}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                  ></textarea>
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  desrtiption:
                  <textarea
                    type="number"
                    className={styles.formInput}
                    value={formData.desrtiption}
                    onChange={(e) => setFormData({...formData, desrtiption: e.target.value})}
                    required
                  ></textarea>
                </label>
              </div>
  
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Subcategory:
                  <select
                    className={styles.formSelect}
                    value={formData.subcategoryId}
                    onChange={(e) => setFormData({...formData, subcategoryId: e.target.value})}
                    required
                  >
                    <option value="">Select subcategory</option>
                    {categories?.flatMap(cat => 
                      cat.subcategories?.map(sub => (
                        <option key={sub.id} value={sub.id}>
                          {cat.name} - {sub.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
              </div>
            </>
          )}
          </div>
          <button type="submit" className={styles.submitButton}>
            {`Create ${modalType?.charAt(0).toUpperCase()}${modalType?.slice(1)}`}
          </button>
        </form>
      </div>
    )
  }

  if (loading) return <div className="text-center p-8">Loading...</div>
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>
  // if (!categories?.length) return <div className="text-center p-8">No categories found</div>

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.shopTitle}>Shop Categories</h1>

      <div className={styles.controls}>
        <button className={styles.btn}onClick={() => setModalType('category')}>Add Category</button>
        <button className={styles.btn}onClick={() => setModalType('subcategory')}>Add Subcategory</button>
        <button className={styles.btn}onClick={() => setModalType('product')}>Add Product</button>
      </div>

      {modalType && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
          
            {renderForm()}
          </div>
        </div>
      )}
      
      {categories?.map(category => (
        
        <section 
          key={category.id}
          className={styles.categorySection}
        >

          <div 
            className={styles.accordionHeader}
            onClick={() => toggleCategory(category.id)}
          >
            <h2 className={styles.categoryTitle}>{category.name}</h2>

            <span className={`${styles.accordionIcon} ${openCategories.has(category.id) ? styles.open : ''}`}>
              ▼
            </span>
          </div>
          <Delete type="category" id={category.id} 
            // eslint-disable-next-line no-undef
            onDelete={() => renderForm()} 
            />
            <br /><br />
          <div 
            className={`${styles.accordionContent} ${openCategories.has(category.id) ? styles.open : ''}`}
          >
            {category.subcategories?.length ? (
              <ul className={styles.subcategoriesList}>
                {category.subcategories.map(subcategory => (
                  <li 
                    key={subcategory.id}
                    className={styles.subcategoryItem}
                  >
                    <div 
                      className={styles.accordionHeader}
                      onClick={() => toggleSubcategory(subcategory.id)}
                    >
                      <h3 className={styles.subcategoryTitle}>{subcategory.name}</h3>
                      <span className={`${styles.accordionIcon} ${openSubcategories.has(subcategory.id) ? styles.open : ''}`}>
                        ▼
                      </span>
                    </div>
                    <Delete type="subcategory" id={subcategory.id} 
            // eslint-disable-next-line no-undef
            onDelete={() => renderForm()} 
            />
            <br /><br />
                    <div 
                      className={`${styles.accordionContent} ${openSubcategories.has(subcategory.id) ? styles.open : ''}`}
                    >
                      {subcategory.products?.length ? (
                        <ul className={styles.productsGrid}>
                          {subcategory.products.map(product => (
                            <li 
                              key={product.id}
                              className={styles.productCard}
                            >
                              <div className={styles.productContent}>
                                <h4 className={styles.productName}>{product.name}</h4>
                                <p className={styles.productPrice}>Price: ${product.price}</p>
                                <p className={styles.productPrice}>Desc: {product.desrtiption}</p>
                                <p className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                                  Stock: {product.stock}
                                </p>
                                <Delete type="product" id={product.id} 
                                // eslint-disable-next-line no-undef
                                onDelete={() => renderForm()} 
                                />
                                <br /><br />
                                {product.filePath && (
                                  <p className={styles.digitalBadge}>
                                    [Digital product available]
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.emptyMessage}>
                          No products in this subcategory
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMessage}>
                No subcategories available
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}