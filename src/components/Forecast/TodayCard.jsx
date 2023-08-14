import React from 'react';

const TodayCard = ({
  heading, content, unit, additionalContent, differentSupClass,
}) => (
  <>
    <div className="today-card-heading">{heading}</div>
    <div className="today-card-content">
      <span className="content">
        {content}
        {' '}
      </span>
      <sup className={differentSupClass ? 'sup-pressure' : 'sup'}>{unit}</sup>
    </div>
    {additionalContent}
  </>
);

export default TodayCard;
