from django.db import models
from item_model_specification.models import ItemModelSpecification


def item_image_directory_path(instance, filename):
    return f"items/{instance.id}/{filename}"


class Attachment(models.Model):
    item_model_specification = models.ForeignKey(to=ItemModelSpecification, on_delete=models.CASCADE,
                                                 related_name='images')
    image = models.ImageField(upload_to=item_image_directory_path, null=True, blank=True)

    class Meta:
        verbose_name = 'Attachment'
        verbose_name_plural = 'Attachments'
