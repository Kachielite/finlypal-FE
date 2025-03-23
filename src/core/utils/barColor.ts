const barColor = (percentageUsed: number, type?: 'budget' | 'savings') => {
  if (type === 'savings') {
    if (percentageUsed < 33.33) return '#FF0000';
    if (percentageUsed < 66.66) return '#FFA500';
    if (percentageUsed < 100) return '#17CE92';
    return '#17CE92';
  }

  if (percentageUsed < 33.33) return '#17CE92';
  if (percentageUsed < 66.66) return '#FFA500';
  if (percentageUsed < 100) return '#FF0000';
  return '#FF0000';
}

export default barColor;