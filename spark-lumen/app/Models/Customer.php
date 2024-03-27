<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'phone', 'user_id'
    ];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    public function projects() {
        return $this->hasMany('App\Models\Project');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($customer) {
            $customer->projects()->delete();
        });
    }
}

