# FixTrack — Two-Minute Pitch Talking Points

> Single-slide presentation. Use these bullet-point notes to guide what you say for each section of the slide.

---

## Problem

- Residents submit a maintenance request and then hear nothing — no status, no timeline, no confirmation it was done
- Customer interviews surfaced this repeatedly: students resubmit tickets, call housing, ask RAs — all because there's zero visibility
- FMS side has the inverse problem: requests come in vague and incomplete, so technicians show up without the right context to resolve the issue efficiently
- Both sides lose — residents feel ignored, FMS wastes time on back-and-forth and duplicate tickets

## Insight

- This is a solved problem in package delivery — FedEx/UPS show every stage (label created, in transit, out for delivery, delivered), an expected delivery date, and a photo on arrival
- Maintenance requests follow the same lifecycle; they just lack the communication layer

## Solution — FixTrack

- A tracking and notification layer that integrates into CMU's existing maintenance request web app
- **Stage-based tracking** — requests move through visible stages: Submitted, Under Review, Scheduled, In Progress, Completed — with an estimated resolution date
- **Photo confirmation** — technician captures a photo of the finished work, attached to the closed request so the resident has proof even if they weren't present
- **Proactive notifications** — residents get notified at every stage change (e.g., "Scheduled for Thursday 2–4 PM," "Technician on the way," "Completed — view photo")

## Why It Works

- Residents get clarity, trust, and peace of mind
- FMS gets structured information up front — fewer duplicates, fewer follow-up calls, better-prepared technicians
- Layers on top of what CMU already uses — not a rip-and-replace

## Ask / Next Step

- Building a working prototype to demonstrate the tracking flow, notification triggers, and photo-confirmation workflow
- Goal: integrate into the existing CMU maintenance web app

---

## Q&A Prep

- **Integration path** — designed as an add-on layer, not a new platform FMS has to adopt
- **Technician effort** — photo step takes seconds on a phone, same as a delivery driver
- **Proven pattern** — stage-based tracking works at massive scale (FedEx, UPS, Amazon, DoorDash)
- **Privacy** — photos capture the completed work, not the resident's space; residents control visibility
- **Grounded in research** — every feature traces back to specific pain points from our customer interviews
