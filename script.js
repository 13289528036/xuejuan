// ... existing code ...

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image Carousel functionality
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');

    let counter = 0;
    const size = carouselImages[0].clientWidth;

    // Set initial position for smooth transition
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    // Button Listeners
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter--;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    // Loop back to start/end
    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].id === 'lastClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - 2;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        if (carouselImages[counter].id === 'firstClone') {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - counter;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });

    // Auto-play carousel
    setInterval(() => {
        if (counter >= carouselImages.length - 1) {
            carouselSlide.style.transition = "none";
            counter = 0;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }, 5000); // Change image every 5 seconds

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Data Visualization with Chart.js
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Chart 1: Age Distribution (Pie Chart)
        const ageData = data.population_characteristics.filter(item => item.dimension === '年龄');
        const ageLabels = ageData.map(item => item.category);
        const ageValues = ageData.map(item => parseFloat(item.value.replace('%', ''))); // Extract percentage as number

        const ageDistributionCtx = document.getElementById('ageDistributionChart');
        if (ageDistributionCtx) {
            new Chart(ageDistributionCtx, {
                type: 'pie',
                data: {
                    labels: ageLabels,
                    datasets: [{
                        data: ageValues,
                        backgroundColor: ['#FF6384', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '大学生微短剧用户年龄分布',
                            color: '#e0e0e0'
                        },
                        legend: {
                            labels: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
        }

        // Chart 2: Viewing Behavior - Daily Average Duration (Bar Chart)
        const dailyDurationData = data.viewing_behavior.find(item => item.indicator === '日均时长（整体）');
        const highFrequencyUsers = data.viewing_behavior.find(item => item.indicator === '高频用户（>2小时/日）');
        const freshmanDailyDuration = data.viewing_behavior.find(item => item.indicator === '大一新生日均时长');

        const viewingBehaviorCtx = document.getElementById('viewingBehaviorChart');
        if (viewingBehaviorCtx) {
            new Chart(viewingBehaviorCtx, {
                type: 'bar',
                data: {
                    labels: ['日均时长（整体）', '高频用户（>2小时/日）', '大一新生日均时长'],
                    datasets: [{
                        label: '观看时长',
                        data: [
                            parseFloat(dailyDurationData.detail.replace('小时', '')),
                            parseFloat(highFrequencyUsers.detail.replace('%', '')),
                            parseFloat(freshmanDailyDuration.detail.replace('小时', ''))
                        ],
                        backgroundColor: ['#FFCE56', '#4BC0C0', '#9966FF'],
                        borderColor: ['#FFCE56', '#4BC0C0', '#9966FF'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '大学生微短剧观看行为统计',
                            color: '#e0e0e0'
                        },
                        legend: {
                            labels: {
                                color: '#c0c0c0'
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#c0c0c0'
                            }
                        },
                        x: {
                            ticks: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
        }

        // Chart 3: Content Preference - Overall Top 3 (Doughnut Chart)
        const overallPreferenceData = data.content_preference.filter(item => item.category === '大学生TOP3');
        const overallLabels = overallPreferenceData.map(item => item.preference.split('（')[0]);
        const overallValues = overallPreferenceData.map(item => parseFloat(item.preference.split('（')[1].replace('%）', '')));

        const contentPreferenceCtx = document.getElementById('contentPreferenceChart');
        if (contentPreferenceCtx) {
            new Chart(contentPreferenceCtx, {
                type: 'doughnut',
                data: {
                    labels: overallLabels,
                    datasets: [{
                        data: overallValues,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '大学生微短剧内容偏好（总体题材）',
                            color: '#e0e0e0'
                        },
                        legend: {
                            labels: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
        }

        // Chart 4: Impact Assessment - Positive vs Negative (Bar Chart)
        const positiveImpacts = data.impact_assessment.filter(item => item.type === '积极影响');
        const negativeImpacts = data.impact_assessment.filter(item => item.type === '负面影响');

        const impactLabels = positiveImpacts.map(item => item.expression.split('：')[0]).concat(negativeImpacts.map(item => item.expression.split('：')[0]));
        const impactValues = positiveImpacts.map(item => parseFloat(item.data_support.match(/\d+(\.\d+)?%/)?.[0].replace('%', '') || 0))
                                .concat(negativeImpacts.map(item => parseFloat(item.data_support.match(/\d+(\.\d+)?%/)?.[0].replace('%', '') || 0)));

        const impactAssessmentCtx = document.getElementById('impactAssessmentChart');
        if (impactAssessmentCtx) {
            new Chart(impactAssessmentCtx, {
                type: 'bar',
                data: {
                    labels: impactLabels,
                    datasets: [{
                        label: '影响评估',
                        data: impactValues,
                        backgroundColor: [
                            '#4CAF50', '#8BC34A', '#CDDC39', // Positive impacts
                            '#F44336', '#FF9800', '#FFC107', '#FFEB3B' // Negative impacts
                        ],
                        borderColor: [
                            '#4CAF50', '#8BC34A', '#CDDC39',
                            '#F44336', '#FF9800', '#FFC107', '#FFEB3B'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '微短剧对大学生的影响评估',
                            color: '#e0e0e0'
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#c0c0c0',
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            ticks: {
                                color: '#c0c0c0'
                            }
                        }
                    }
                }
            });
        }

    })
    .catch(error => console.error('Error loading the data.json file:', error));

    document.addEventListener('DOMContentLoaded', () => {
        const teaCards = document.querySelectorAll('.tea-card');
    
        // 示例茶叶数据 (后续可以从JSON文件或API加载)
        const teaDataStore = {
            biluochun: {
                name: "江苏碧螺春",
                image: "images/tea_images/biluochun.jpg", // 假设图片在 images/tea_images/ 目录下
                fullDescription: "碧螺春是中国传统名茶，以其螺旋形状和清香著称。产于江苏太湖周边，历史悠久，品质优异。",
                // 可以添加更多属性，如历史、产地、冲泡方法等
            },
            longjing: {
                name: "西湖龙井",
                image: "images/tea_images/longjing.jpg",
                fullDescription: "西湖龙井，产于浙江杭州西湖一带，是中国十大名茶之一。其色绿、香郁、味甘、形美，四绝著称于世。"
            },
            // 为其他茶叶添加类似的数据...
        };
    
        teaCards.forEach(card => {
            card.addEventListener('click', () => {
                const teaKey = card.getAttribute('data-tea'); // 从data-tea属性获取茶叶的键
                const teaInfo = teaDataStore[teaKey];
    
                if (teaInfo) {
                    showTeaDetailModal(teaInfo);
                } else {
                    // 如果没有找到茶叶信息，可以显示一个默认信息或跳转到茶叶列表页
                    alert(`抱歉，暂无 ${card.querySelector('h3').textContent} 的详细信息。`);
                }
            });
        });
    });

    function showTeaDetailModal(teaData) {
        // ... (模态框函数保持不变)
    }