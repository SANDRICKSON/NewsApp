import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaWhatsapp, FaLinkedinIn, FaBookmark, FaRegBookmark, FaClipboard } from 'react-icons/fa';

const NewsItem = ({ title, description, src, url }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    // State საყვარელისთვის
    const [bookmarked, setBookmarked] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    // გამართავს საყვარელის სტატუსს ლოკალსტორიჯიდან
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
        setBookmarked(saved.includes(url));
    }, [url]);

    // Bookmark Toggle
    const toggleBookmark = () => {
        const saved = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
        let updated;
        if (bookmarked) {
            updated = saved.filter(item => item !== url);
            setBookmarked(false);
        } else {
            updated = [...saved, url];
            setBookmarked(true);
        }
        localStorage.setItem('bookmarkedArticles', JSON.stringify(updated));
    };

    // Clipboard Copy
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 1500);
        });
    };

    const iconStyle = { fontSize: 20, cursor: 'pointer', marginRight: 10 };

    return (
        <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: '345px' }}>
            {src && <img src={src} className="card-img-top" alt={title} />}
            <div className="card-body">
                <h5 className="card-title">{title.slice(0, 50)}</h5>
                <p className="card-text">{description ? description.slice(0, 90) : 'News'}</p>
                <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Read more
                </a>

                {/* Social Sharing Icons */}
                <div style={{ marginTop: 10, display: 'flex', gap: 15, alignItems: 'center' }}>
                    {/* Bookmark */}
                    <div onClick={toggleBookmark} aria-label={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'} title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
                        {bookmarked ? <FaBookmark style={{ ...iconStyle, color: '#ffcc00' }} /> : <FaRegBookmark style={{ ...iconStyle, color: '#ccc' }} />}
                    </div>

                    {/* Clipboard */}
                    <div onClick={copyToClipboard} aria-label="Copy URL to clipboard" title="Copy URL to clipboard" style={{ position: 'relative' }}>
                        <FaClipboard style={{ ...iconStyle, color: copySuccess ? 'limegreen' : '#ccc' }} />
                        {copySuccess && (
                            <span style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                            }}>
                Copied!
              </span>
                        )}
                    </div>

                    {/* შემდეგი Social Icons */}
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        style={{ cursor: 'pointer', color: '#3b5998', fontSize: 20 }}
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Twitter"
                        style={{ cursor: 'pointer', color: '#1da1f2', fontSize: 20 }}
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href={`https://telegram.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Telegram"
                        style={{ cursor: 'pointer', color: '#0088cc', fontSize: 20 }}
                    >
                        <FaTelegramPlane />
                    </a>
                    <a
                        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on WhatsApp"
                        style={{ cursor: 'pointer', color: '#25d366', fontSize: 20 }}
                    >
                        <FaWhatsapp />
                    </a>
                    <a
                        href={`https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        style={{ cursor: 'pointer', color: '#0077b5', fontSize: 20 }}
                    >
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
