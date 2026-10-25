/**
 * TEAM 110 COASTAL SURVEILLANCE & SPATIAL AI
 * DOCUMENTATION PORTAL - APPLICATION LOGIC (app.js)
 */

// Empirical Multi-Model Benchmark Data
const MODEL_DETAILS = [
    {
        id: 0,
        title: "Detectron2: Faster R-CNN (ResNet-101 + FPN)",
        lead: "M. Balaji Sakthivel (CB.SC.U4CSE23213)",
        paradigm: "Two-Stage Deep Residual Architecture",
        summary: "Primary architecture chosen for coastal high-tower surveillance. Combines a 101-layer deep residual network with Feature Pyramid Networks (P2--P6) and a customized 16px sub-scale anchor generator to resolve distant micro-swimmers.",
        specs: [
            { key: "Backbone", val: "ResNet-101 (4 residual stages, bottleneck blocks)" },
            { key: "Feature Neck", val: "Feature Pyramid Network (FPN, 256 uniform channels)" },
            { key: "Custom Anchors", val: "[[16], [32], [64], [128], [256]] with aspect ratios [0.5, 1.0, 2.0]" },
            { key: "RoI Pooling", val: "RoIAlign with continuous bilinear interpolation (7×7 sampling grid)" },
            { key: "Box Head", val: "Two 1024-d fully connected layers feeding Softmax & Smooth L1 branches" },
            { key: "Training Config", val: "6,000 iterations (≈52 epochs) on Dual Tesla T4 GPUs with warmup & step decay" },
            { key: "Scene 1 Match", val: "19 / 19 exact human headcount match" }
        ],
        metrics: [
            { label: "mAP@0.50", val: "94.15%" },
            { label: "mAP@0.5:0.95", val: "68.48%" },
            { label: "Precision", val: "95.80%" },
            { label: "Recall", val: "92.40%" },
            { label: "F1-Score", val: "94.07%" },
            { label: "AP@0.75", val: "82.37%" }
        ],
        images: [
            { src: "assets/detectron2_scene1.png", caption: "Detectron2 Ground Truth vs. Predicted Count (Dual-Line Header)" },
            { src: "assets/detectron2conf.png", caption: "Dual-Zone Confusion Matrix on Holdout Validation Benchmark" },
            { src: "assets/detectron2_architecture_diagram.png", caption: "Deep ResNet-101 FPN & Custom RPN Sub-Scale Anchor Architecture" }
        ],
        deepDive: `
            <h4>Region Proposal Network (RPN) with 16px Anchors:</h4>
            <p>Standard Faster R-CNN uses 32px base anchors, causing distant 6px--12px swimmers in breaking ocean surf to be dropped as background noise. We customized the RPN anchor scales to [[16], [32], [64], [128], [256]], generating high-IoU candidate proposals on tiny offshore bathers.</p>
            <h4 class="mt-3">Dual-Line Verification Header:</h4>
            <p>Every generated image features a non-truncated 60px banner comparing actual ground truth with automated predictions: <code>GROUND TRUTH: Total = N | Water = W | Land = L</code> vs. <code>MODEL PREDICTION: L: Count = N | Water(L) = W | Land(L) = L</code>.</p>
        `
    },
    {
        id: 1,
        title: "RT-DETR: Real-Time Vision Transformer (HGNet-v2)",
        lead: "Chitturi Venkata Chaitanya (CB.SC.U4CSE23214)",
        paradigm: "End-to-End NMS-Free Vision Transformer",
        summary: "Delivers the highest overall detection accuracy (94.86% mAP@0.50). Employs an efficient hybrid encoder and Hungarian bipartite matching, eliminating the Non-Maximum Suppression (NMS) clustering bottleneck entirely.",
        specs: [
            { key: "Backbone", val: "High-performance HGNet-v2 / ResNet-50 extracting multi-scale features S3, S4, S5" },
            { key: "Hybrid Encoder", val: "AIFI (Single-scale intra-interaction on S5) + CCFM (Cross-scale feature fusion)" },
            { key: "Transformer Decoder", val: "6 decoder layers with deformable cross-attention & 300 target queries" },
            { key: "Query Selection", val: "IoU-aware query selection initializing positional queries with feature maps" },
            { key: "Loss Formulation", val: "Bipartite Hungarian Matching: Focal Loss + GIoU + L1 coordinates" },
            { key: "Mean IoU", val: "91.51% bounding box spatial overlap accuracy" }
        ],
        metrics: [
            { label: "mAP@0.50", val: "94.86%" },
            { label: "mAP@0.5:0.95", val: "84.25%" },
            { label: "Precision", val: "88.71%" },
            { label: "Recall", val: "93.78%" },
            { label: "F1-Score", val: "91.17%" },
            { label: "AP@0.75", val: "92.20%" }
        ],
        images: [
            { src: "assets/rtdetr_pred.jpg", caption: "RT-DETR Detection Predictions on High-Resolution Coastal Benchmark" },
            { src: "assets/redetrconf.png", caption: "Normalized Dual-Zone Confusion Matrix (3000×2250 High Resolution)" }
        ],
        deepDive: `
            <h4>Computational Optimization via AIFI:</h4>
            <p>Traditional DETR applies self-attention across all multi-scale feature maps, incurring quadratic computational complexity. RT-DETR limits intra-scale self-attention exclusively to the deepest S5 level (saving 65% compute), while CCFM fuses intermediate scales with light convolutional blocks.</p>
            <h4 class="mt-3">NMS-Free Bipartite Matching:</h4>
            <p>Direct bipartite matching assigns exactly one predicted bounding box per ground truth target, eliminating false box clustering around nearby beachgoers and waders.</p>
        `
    },
    {
        id: 2,
        title: "YOLOv8x-P2: Stride-4 Micro Head Architecture",
        lead: "R. Shanmugham (CB.SC.U4CSE23257)",
        paradigm: "Single-Stage Anchor-Free Small-Object Detector",
        summary: "Delivers the highest real-time inference speed (46.2 FPS on Tesla T4). Features a specialized Stride-4 (P2, 160×160) feature pyramid upsampling level specifically designed to retain spatial pixel clusters of tiny distant swimmers.",
        specs: [
            { key: "Backbone", val: "Modified CSPDarknet with C2f cross-stage bottleneck blocks & SPPF at P5" },
            { key: "P2 Head Innovation", val: "Dedicated Stride-4 upsampling branch (160×160 feature map at 640 input)" },
            { key: "Head Structure", val: "Decoupled anchor-free classification & box regression subnets" },
            { key: "Loss Formulation", val: "Task-Aligned Assigner (TAL) + CIoU + Distribution Focal Loss (DFL)" },
            { key: "Headcount Acc", val: "98.12% accuracy on validation headcount evaluations" }
        ],
        metrics: [
            { label: "mAP@0.50", val: "88.62%" },
            { label: "mAP@0.5:0.95", val: "61.17%" },
            { label: "Precision", val: "91.93%" },
            { label: "Recall", val: "89.34%" },
            { label: "F1-Score", val: "90.62%" },
            { label: "Speed", val: "46.2 FPS" }
        ],
        images: [
            { src: "assets/yolo_scene1.png", caption: "YOLOv8x-P2 Ground Truth vs. Model Prediction (Dual-Line Header)" },
            { src: "assets/yolop2normaconf.png", caption: "Normalized Dual-Zone Confusion Matrix (3000×2250 High Resolution)" }
        ],
        deepDive: `
            <h4>Stride-4 P2 Small-Object Spatial Preservation:</h4>
            <p>Standard YOLO architectures downsample inputs to Stride-8 (P3), causing 8px--12px distant swimmers to collapse into a single spatial cell. Our P2 configuration introduces a top-down lateral upsampling branch terminating at Stride-4, retaining rich pixel clusters of distant swimmers.</p>
            <h4 class="mt-3">Real-Time Edge Throughput:</h4>
            <p>Sustains 46.2 FPS on Tesla T4 with sub-20ms latency, making it the most suitable single-stage architecture for high-speed coastal monitoring.</p>
        `
    },
    {
        id: 3,
        title: "Faster R-CNN: ResNet-50 Two-Stage Proposal Benchmark",
        lead: "Bhargava Ram Kaza (CB.SC.U4CSE23711)",
        paradigm: "Two-Stage Region Proposal & Coordinate Regression",
        summary: "Canonical two-stage proposal framework establishing reference baseline. Achieved highest proposal precision (98.94%) and recall (99.27%) on matched candidate proposals.",
        specs: [
            { key: "Backbone", val: "ResNet-50 with lateral Feature Pyramid Network connections" },
            { key: "Proposal Engine", val: "Dense 3×3 conv RPN generating top 1,000 region proposals per frame" },
            { key: "Sampling Mechanism", val: "RoIAlign continuous bilinear interpolation to uniform 7×7 feature maps" },
            { key: "Classification Head", val: "Two 1024-d fully connected layers feeding Softmax & Smooth L1" },
            { key: "Matched TP", val: "1,147 true positive human bounding boxes correctly classified" }
        ],
        metrics: [
            { label: "mAP@0.50", val: "88.82%" },
            { label: "mAP@0.5:0.95", val: "66.61%" },
            { label: "Precision", val: "98.94%" },
            { label: "Recall", val: "99.27%" },
            { label: "F1-Score", val: "99.10%" },
            { label: "AP Land (0)", val: "71.56%" }
        ],
        images: [
            { src: "assets/frcnn_batch.png", caption: "Faster R-CNN Candidate Proposals Detection Batch on Coastal Scene" },
            { src: "assets/frcnnconf.png", caption: "Faster R-CNN Dual-Zone Confusion Matrix on Holdout Validation Benchmark" }
        ],
        deepDive: `
            <h4>Two-Stage Proposal Verification:</h4>
            <p>Decoupling proposal generation from classification allows Faster R-CNN to maintain disciplined spatial proposals (98.94% precision), successfully filtering out turbulent water glare in active coastal shorelines.</p>
            <h4 class="mt-3">Classification Purity:</h4>
            <p>On matched candidate boxes, Faster R-CNN reached 1.00 precision on Sand Humans and 0.98 on Water Swimmers across 1,741 evaluation instances.</p>
        `
    },
    {
        id: 4,
        title: "RetinaNet: ResNet-50-FPN with Dynamic Focal Loss",
        lead: "Shaik Ibbraheem (CB.SC.U4CSE23742)",
        paradigm: "Dense One-Stage Detector with Hard-Negative Mining",
        summary: "Specialist detector formulated to eliminate false alarms caused by harsh sunlight, reflective wave crests, and breaking foam using dynamic Focal Loss hard-negative gradient weighting.",
        specs: [
            { key: "Backbone", val: "ResNet-50-FPN producing multi-scale pyramids P3 to P7" },
            { key: "Loss Formulation", val: "FL(pt) = -αt (1 - pt)^γ log(pt) with α=0.25 and focusing parameter γ=2.0" },
            { key: "Negative Suppression", val: "Dynamically down-weights gradient contributions from easy ocean background tiles" },
            { key: "Inference Speed", val: "32.0 FPS sustained throughput on NVIDIA Tesla T4" }
        ],
        metrics: [
            { label: "mAP@0.50", val: "89.20%" },
            { label: "mAP@0.5:0.95", val: "61.20%" },
            { label: "Precision", val: "91.20%" },
            { label: "Recall", val: "87.40%" },
            { label: "F1-Score", val: "89.26%" },
            { label: "AP Water (1)", val: "90.80%" }
        ],
        images: [
            { src: "assets/retina_scene1.png", caption: "RetinaNet Ground Truth vs. Predicted Count (Dual-Line Header)" },
            { src: "assets/retinanetconf.png", caption: "RetinaNet Dual-Zone Confusion Matrix (1800×1500 High Resolution)" }
        ],
        deepDive: `
            <h4>Marine Glint Down-Weighting via Focal Loss:</h4>
            <p>In standard Cross-Entropy loss, millions of easy sea-surface background tiles dominate the gradient signal, masking subtle features of submerged swimmers. RetinaNet's modulating factor (1 - pt)^γ reduces the loss contribution from well-classified ocean water by up to 1,000×, focusing updates on ambiguous swimmer silhouettes.</p>
            <h4 class="mt-3">Dual-Zone Empirical Score:</h4>
            <p>RetinaNet achieved 91.20% precision and 89.26% F1-score with 32.0 FPS, making it a reliable single-stage candidate for high-glare sunny beach environments.</p>
        `
    }
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(7, 13, 24, 0.98)';
                navLinks.style.padding = '1.5rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

    // 3. Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.style.display = 'none';
            }
        });
    });
});

// Switch Model Tabs
function switchModelTab(index) {
    const tabs = document.querySelectorAll('.model-tab');
    const panels = document.querySelectorAll('.model-panel');

    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    panels.forEach((panel, i) => {
        if (i === index) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// Open Interactive Model Details Modal
function openModelModal(modelIndex) {
    const data = MODEL_DETAILS[modelIndex];
    if (!data) return;

    const modal = document.getElementById('model-modal');
    const contentArea = document.getElementById('modal-content-area');

    let specsHtml = data.specs.map(s => `
        <div class="spec-row">
            <span class="spec-key">${s.key}:</span>
            <span class="spec-val">${s.val}</span>
        </div>
    `).join('');

    let metricsHtml = data.metrics.map(m => `
        <div class="metric-pill">
            <span class="mp-val">${m.val}</span>
            <span class="mp-lbl">${m.label}</span>
        </div>
    `).join('');

    let imagesHtml = data.images.map(img => `
        <div class="visual-card mb-3">
            <h4>${img.caption}</h4>
            <img src="${img.src}" alt="${img.caption}" class="model-visual-img" onclick="openLightbox('${img.src}', '${img.caption.replace(/'/g, "\\'")}')">
        </div>
    `).join('');

    contentArea.innerHTML = `
        <div class="modal-header-block mb-3">
            <div class="model-meta">
                <span class="badge badge-primary">${data.paradigm}</span>
                <span class="badge badge-success">${data.lead}</span>
            </div>
            <h2 class="mt-2">${data.title}</h2>
            <p class="text-secondary text-sm mt-1">${data.summary}</p>
        </div>

        <div class="grid grid-2 mt-4">
            <div>
                <h4 class="card-title mb-2">Technical Specifications</h4>
                <div class="spec-table">${specsHtml}</div>

                <h4 class="card-title mt-4 mb-2">Empirical Performance Metrics</h4>
                <div class="metrics-pill-group">${metricsHtml}</div>

                <div class="mt-4 pt-3 border-top">
                    ${data.deepDive}
                </div>
            </div>

            <div>
                <h4 class="card-title mb-2">Visual Artifacts & Verification Matrices</h4>
                ${imagesHtml}
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModelModal() {
    const modal = document.getElementById('model-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close Modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModelModal();
        closeLightbox();
    }
});

// Image Lightbox
function openLightbox(src, caption) {
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption || '';
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Copy Citation Functionality
function copyCitation() {
    const citationText = document.getElementById('citation-text').innerText;
    navigator.clipboard.writeText(citationText).then(() => {
        showToast('BibTeX citation copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy. Please select and copy manually.');
    });
}

// Notification Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3200);
    }
}
