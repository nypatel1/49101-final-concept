# FixTrack: Transparent Facilities Maintenance for CMU Residents

## Two-Minute Pitch

---

### The Problem (0:00 – 0:30)

You submit a maintenance request for a broken heater in your dorm room — it's mid-January in Pittsburgh. You get a confirmation email... and then silence. Days go by. You don't know if anyone has seen your request, if a technician is scheduled, or if the work was actually completed while you were in class. You submit a second request just to be safe. You ask your RA. You call the housing office. Nobody has a clear answer.

This is the reality for thousands of CMU residents every year. Through our customer interviews, we heard the same frustrations over and over:

- **"I had no idea what was happening with my request."**
- **"I wasn't sure if it was actually fixed — someone just came into my room while I was gone."**
- **"I submitted the same request three times because I never heard back."**

And it's not just residents who suffer. The Facilities Management Services (FMS) team told us they often receive vague or incomplete requests, making it harder to diagnose problems, bring the right tools, and resolve tickets efficiently. The lack of structured information flowing *in* is just as costly as the lack of communication flowing *out*.

---

### The Insight (0:30 – 0:50)

This is a communication problem that has already been solved — just in a different industry.

Think about the last time you ordered a package. FedEx and UPS don't just tell you "it's on the way." They show you every stage: **label created, in transit, out for delivery, delivered** — complete with an estimated delivery date and a photo of the package at your door.

That model of **active, stage-based communication with visual confirmation** is exactly what maintenance requests need.

---

### The Solution: FixTrack (0:50 – 1:30)

**FixTrack** is a transparent maintenance tracking layer designed to integrate directly into CMU's existing web-based request system. It introduces three core capabilities:

#### 1. Live Request Tracking with Stage Visibility

Every request moves through clear, visible stages — just like a package:

| Stage | Description |
|---|---|
| **Submitted** | Request received and logged |
| **Under Review** | FMS staff is evaluating the issue |
| **Scheduled** | A technician and time window are assigned |
| **In Progress** | Work is actively being performed |
| **Completed** | Work is finished, with photo confirmation |

Residents see exactly where their request stands at all times, along with an **estimated resolution date** that updates as the request progresses.

#### 2. Photo Confirmation on Completion

When a technician finishes a job, they take a photo of the completed work — a repaired heater, a replaced light fixture, a patched wall. That photo is attached to the request and visible to the resident. This provides **proof of completion**, builds trust, and eliminates the "did someone actually come?" uncertainty — especially for work done while residents are away.

#### 3. Proactive Notifications

Residents receive push or email notifications at every stage transition:

- *"Your request has been scheduled for Thursday, 2–4 PM."*
- *"A technician is on the way to your room."*
- *"Your request has been completed. View the photo."*

No more checking a portal and hoping for updates. The system comes to you.

---

### Why This Works (1:30 – 1:50)

**For residents**, FixTrack removes anxiety and uncertainty. You always know what's happening, when to expect resolution, and whether the job was done right.

**For FMS staff**, structured request stages and richer intake information mean fewer duplicate tickets, fewer follow-up calls, and better-prepared technicians arriving on site.

**For CMU Housing**, this is a measurable improvement in resident satisfaction and operational efficiency — built to layer on top of the systems already in place, not replace them.

---

### The Ask (1:50 – 2:00)

We are building FixTrack as a concept integration for the current CMU maintenance request web app. Our next step is a working prototype that demonstrates the tracking flow, notification triggers, and photo-confirmation workflow.

We're here to turn a frustrating black box into a window — so that no CMU student has to wonder whether anyone heard them.

---

## Appendix: Key Talking Points for Q&A

- **Integration, not replacement.** FixTrack is designed as a layer on top of the existing system. It does not require FMS to adopt an entirely new platform.
- **Low friction for technicians.** The photo confirmation step takes seconds on a mobile device — similar to how delivery drivers already operate.
- **Scalable model.** The stage-based tracking pattern is proven at massive scale (FedEx, UPS, Amazon, DoorDash). Adapting it to facilities management is a natural fit.
- **Privacy-conscious.** Photos are of the *completed work*, not of residents' personal spaces beyond what is necessary. Residents control visibility.
- **Customer-interview-driven.** Every feature maps directly to pain points we heard from real CMU residents and FMS staff during our research.
