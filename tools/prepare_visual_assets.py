"""Copy selected generated visuals into the site as optimized WebP assets."""

from pathlib import Path
from PIL import Image

SOURCE = Path.home() / ".codex" / "generated_images" / "01a0e8b3-b837-7081-be53-6ebd8cb55a5b"
DESTINATION = Path(__file__).resolve().parents[1] / "public" / "assets" / "visuals"

ASSETS = {
    "hero-main": "ae4a0c70-4f78-4c4a-aeae-9e869ad5051b",
    "service-web": "81ca3d1b-82f1-487b-84c1-853d56fd42d5",
    "service-development": "13b4ce66-f07d-40dd-ac8d-c6c0cfd58c18",
    "service-commerce": "b4f419e1-548c-45fc-a290-e1dfac17d465",
    "service-apps": "5d1ca41b-d91b-47ae-b78b-e589fe43bace",
    "service-logo": "612a70ba-f549-4ae9-b513-2b9bc96b267d",
    "service-identity": "eb22d50f-3b96-4651-8f3a-523fab4c6db7",
    "service-social": "5ae5ec61-02f1-4413-bda0-8b62c6cfc53e",
    "portfolio-property": "4a4c8353-0374-4aa0-ba0f-777afa632ee0",
    "portfolio-restaurant": "ecb31efa-f4b1-48f4-8c32-b7625a8b07f1",
    "portfolio-education": "fbc736ad-f2ea-4734-9516-440f4e2a7cb0",
    "portfolio-dental": "131d35ee-f86c-4885-95eb-b506497e9fc2",
    "portfolio-company": "7be54a2f-dd48-4dac-9cbf-9fa638e5a09b",
    "portfolio-commerce": "9ce17918-7670-47b8-ab2d-00fcd42353c3",
    "portfolio-automotive": "e7a6a2d5-8f7b-4c06-a4d4-292bc65161c7",
    "portfolio-legal": "fcbcb013-848a-49bf-9be3-9145cccfc642",
    "portfolio-beauty": "4edab6a4-af9a-422b-a238-49b5cf4c295f",
    "portfolio-plumbing": "ff0f981e-b8ce-4ba2-b5b6-993fec73e95a",
    "package-basic": "597224c4-e0c3-4f11-8e7c-55e1b6fae524",
    "package-advanced": "e6e30a45-ebaa-4b97-be8f-ef6318f4e064",
    "package-custom": "ba56c11c-db91-4061-93d7-b59e0d0ed029",
    "blog-mobile": "f795849a-1c4b-4a9b-8e1e-88254a7aaf65",
    "blog-brand": "87d8c582-c705-4ca2-b813-bce0984dcc29",
    "blog-brief": "7003991c-79cd-483c-9942-754b7715a0c7",
    "contact-main": "700fc054-ca9b-463b-bdb1-bec291722ae1",
    "about-story": "6c510dab-b9f8-4d4d-92a4-faf9027988b4",
    "about-method": "19ebc60a-ff8e-425d-99e1-4437b59ed46e",
    "faq-support": "73bd281b-1920-4d0f-8c3a-ca9d15d36a3b",
}


def main():
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for name, identifier in ASSETS.items():
        source = SOURCE / f"exec-{identifier}.png"
        if not source.is_file():
            raise FileNotFoundError(source)
        target = DESTINATION / f"{name}.webp"
        with Image.open(source) as image:
            image = image.convert("RGB")
            if image.width > 1600:
                image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(target, "WEBP", quality=83, method=6)
        print(f"{name}: {target.stat().st_size // 1024} KiB")


if __name__ == "__main__":
    main()
