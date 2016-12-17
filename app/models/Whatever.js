var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Whatever Model
 * ==========
 */

 var Whatever = new keystone.List('Whatever', {
 	map: { name: 'title' },
 	autokey: { path: 'slug', from: 'title', unique: true },
 });

 Whatever.add({
 	title: { type: String, required: true }
 });

 Whatever.register();
