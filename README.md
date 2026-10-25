# Team 110: Automated Coastal Human Surveillance & Spatial Crowd Counting AI

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://mbalajisakthivel007.github.io/G110_Website/)
[![Course](https://img.shields.io/badge/Course-23CSE498%20Project%20Phase%202-007acc?style=for-the-badge)](https://mbalajisakthivel007.github.io/G110_Website/)
[![Institution](https://img.shields.io/badge/Amrita-School%20of%20Computing-red?style=for-the-badge)](https://mbalajisakthivel007.github.io/G110_Website/)

Official Documentation Portal & Engineering Benchmark Suite for **Team 110 (23CSE498 Project Phase 2)**.

🌐 **Live Deployed Documentation Website:** [https://mbalajisakthivel007.github.io/G110_Website/](https://mbalajisakthivel007.github.io/G110_Website/)

---

## 📌 Project Overview
- **Domain:** Automated Coastal Human Surveillance, Spatial Domain Classification (Water Swimmer vs. Land Beachgoer), and Crowd Density Analysis.
- **Architectures Benchmarked:**
  1. **Detectron-2 (Faster R-CNN ResNet-101 FPN):** Custom 16px sub-scale anchors, 94.15% mAP@0.50, 95.80% precision.
  2. **RT-DETR (Vision Transformer):** End-to-end bipartite matching, 94.86% mAP@0.50 (Benchmark Leader).
  3. **YOLOv8x-P2:** Stride-4 small-object head, 46.2 FPS on Tesla T4, 88.62% mAP@0.50.
  4. **Faster R-CNN (ResNet-50 FPN):** Canonical proposal baseline, 98.94% proposal precision.
  5. **RetinaNet (ResNet-50 FPN):** Dynamic Focal Loss ($lpha=0.25, \gamma=2.0$) suppressing ocean wave foam and solar glint.

---

## 📂 Repository Structure
- `G110_Documentation_Portal/` - Complete standalone portal directory
- `index.html` - Main interactive documentation portal
- `style.css` - Responsive high-contrast design system
- `app.js` - Dynamic model comparison, confusion matrix lightboxes, and spec modals
- `assets/` - High-resolution detection outputs, confusion matrices, and the IEEE Draft Paper PDF

---

## 👥 Team Members & Ownership
- **M. Balaji Sakthivel (CB.SC.U4CSE23213)** - Detectron-2 Architecture, 16px Anchor Generator & Dual-Line Verification
- **Chitturi Venkata Chaitanya (CB.SC.U4CSE23214)** - RT-DETR Vision Transformer & Hungarian Bipartite Matching
- **R. Shanmugham (CB.SC.U4CSE23257)** - YOLOv8x-P2 Stride-4 Micro Head Architecture & Edge Latency
- **Bhargava Ram Kaza (CB.SC.U4CSE23711)** - Faster R-CNN Canonical Two-Stage Proposal Framework
- **Shaik Ibbraheem (CB.SC.U4CSE23742)** - RetinaNet Focal Loss & Dynamic Marine Glint Suppression

**Faculty Project Guide:** Ms. Sujee R., Assistant Professor, Department of CSE, Amrita School of Computing.
