selfie = models.FileField(upload_to='kyc/selfies/', validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])], null=True, blank=True)
