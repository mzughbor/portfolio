// Load projects data: try inline <script> first, else fetch JSON
const inlineDataScript = document.getElementById('experimental-data');
const dataPromise = inlineDataScript
  ? Promise.resolve(JSON.parse(inlineDataScript.textContent))
  : fetch('experimental-projects.json').then(res => res.json());

// Process data
dataPromise.then(data => {
  const track = document.getElementById('experimental-slider-track');
  data.projects.forEach(project => {
    const slide = document.createElement('div');
    slide.className = 'slide doodle-card-wrapper';

    slide.innerHTML = `
      <div class="doodle-card-img">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="doodle-card-content">
        <p class="doodle-card-content__date">${project.date}</p>
        <p class="doodle-card-content__event">${project.title}</p>
        ${project.description ? `<p class="doodle-card-content__desc">${project.description}</p>` : ''}
      </div>
    `;

    track.appendChild(slide);
  });

  // Initialize experimental slider after injecting cards
  if (typeof initSlider === "function") initSlider('experimental'); // or your custom slider init logic
})
.catch(err => console.error('Failed to load experimental projects:', err));
fetch('experimental-projects.json') // Adjust path as needed
  .then(res => res.json())
  .then(data => {
    const track = document.getElementById('experimental-slider-track');
    data.projects.forEach(project => {
      const slide = document.createElement('div');
      slide.className = 'slide doodle-card-wrapper';

      slide.innerHTML = `
        <div class="doodle-card-img">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="doodle-card-content">
          <p class="doodle-card-content__date">${project.date}</p>
          <p class="doodle-card-content__event">${project.title}</p>
          ${project.description ? `<p class="doodle-card-content__desc">${project.description}</p>` : ''}
        </div>
      `;

      track.appendChild(slide);
    });

    // Initialize experimental slider after injecting cards
    if (typeof initSlider === "function") initSlider('Experimental'); // or your custom slider init logic
  })
  .catch(err => console.error('Failed to load experimental projects:', err));
