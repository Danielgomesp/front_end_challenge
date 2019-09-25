import React from 'react';
import './styles.css';

export default function Details({ match }) {
  const { slug } = match.params;
  return <p>hi, {slug}</p>;
}
